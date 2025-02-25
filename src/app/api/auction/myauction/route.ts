import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { user_id, newMyAuction } = body;

    if (!user_id || !newMyAuction) {
      return NextResponse.json({ error: "user_id 또는 newAuction 데이터가 없습니다." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("data");
    const user = await db.collection("data").findOne({ user_id: user_id });

    if (!user) {
      return NextResponse.json({ error: "사용자를 찾을 수 없습니다." }, { status: 404 });
    }

    const isDuplicate = user.my_auction?.some(
      (item: any) =>
        item.item_display_name === newMyAuction.item_display_name &&
        item.date_auction_expire === newMyAuction.date_auction_expire &&
        item.item_count === newMyAuction.item_count &&
        item.auction_price_per_unit === newMyAuction.auction_price_per_unit,
    );

    const auctionWithId = {
      ...newMyAuction,
      _id: new ObjectId(), // MongoDB 고유 ID 추가
    };

    if (isDuplicate) {
      return NextResponse.json({ error: "이미 등록된 경매 항목입니다." }, { status: 400 });
    }

    await db.collection("data").updateOne({ user_id }, { $push: { my_auction: auctionWithId } });

    return NextResponse.json({ message: "경매 항목이 추가되었습니다." });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    (await clientPromise).close;
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { user_id, auction_item_id } = body;

    if (!user_id || !auction_item_id || !Array.isArray(auction_item_id)) {
      return NextResponse.json({ error: "선택된 항목이 없거나 로그인되지 않았습니다." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("data");
    const user = await db.collection("data").findOne({ user_id });

    if (!user) {
      return NextResponse.json({ error: "사용자를 찾을 수 없습니다." }, { status: 404 });
    }

    const auctionItemIds = auction_item_id.map(id => new ObjectId(id));

    await db
      .collection("data")
      .updateOne({ user_id }, { $pull: { my_auction: { _id: { $in: auctionItemIds } } } } as any);

    return NextResponse.json({ message: "경매 항목이 삭제되었습니다." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
