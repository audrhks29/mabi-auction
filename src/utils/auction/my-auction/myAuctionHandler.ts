import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { Row, Table } from "@tanstack/react-table";

export const handleAddData = async (
  userData: UserDataTypes,
  row: Row<ItemListsTypes>,
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>,
) => {
  const userId = userData?.user_id;
  const itemData = row.original;

  if (!userId) {
    alert("로그인 후 이용해주세요.");
    return;
  }

  try {
    const response = await fetch("/api/auction/myauction", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        newMyAuction: itemData,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(`${result.error || "알 수 없는 오류 발생"}`);
      return;
    } else {
      alert("아이템이 추가되었습니다!");
      await refetch();
    }
  } catch (error) {
    alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
  }
};

export const handleDeleteData = async (
  table: Table<ItemListsTypes>,
  userData: UserDataTypes,
  setRowSelection: React.Dispatch<React.SetStateAction<{}>>,
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>,
) => {
  const selectedIds = table.getSelectedRowModel().rows.map(row => row.original._id);

  if (selectedIds.length === 0) {
    alert("삭제할 항목을 선택하세요.");
    return;
  }

  try {
    const response = await fetch("/api/auction/myauction", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userData.user_id, auction_item_id: selectedIds }),
    });

    if (!response.ok) {
      throw new Error("삭제 요청 실패");
    }

    alert("삭제가 완료되었습니다!");

    setRowSelection({});
    await refetch();
  } catch (error) {
    console.error(error);
    alert("삭제 중 오류 발생");
  }
};
