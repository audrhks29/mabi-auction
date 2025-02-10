import OptionIndex from "./optionTypes/OptionIndex";

import useItemOptionStore from "@/store/itemOption-store";
import itemOptionLists from "@/assets/auction/itemOptionLists.json";

export default function OptionModal({ data }: { data: any }) {
  const { selectedItemOptions, addItemOption, setIsFilter, clearItemOptions } = useItemOptionStore(state => ({
    selectedItemOptions: state.selectedItemOptions,
    addItemOption: state.addItemOption,
    setIsFilter: state.setIsFilter,
    clearItemOptions: state.clearItemOptions,
  }));

  const setSelectedItemOptions = (index: number, newOption: Partial<(typeof selectedItemOptions)[number]>) => {
    useItemOptionStore.setState(state => {
      const updatedOptions = [...state.selectedItemOptions];
      updatedOptions[index] = { ...updatedOptions[index], ...newOption };
      return { selectedItemOptions: updatedOptions };
    });
  };

  return (
    <>
      <button
        className="btn btn-neutral h-10 min-h-10 text-[12px] md:text-[14px]"
        onClick={() => {
          data === undefined
            ? alert("데이터를 검색하신 후 실행해주세요.")
            : (document.getElementById("search_option_modal") as HTMLDialogElement).showModal();
        }}>
        옵션 선택
      </button>

      <dialog id="search_option_modal" className="modal">
        <div className="modal-box bg-base-200">
          <h3 className="text-lg font-bold text-center mb-3">옵션검색</h3>

          <div className="divider m-0 p-0"></div>

          {selectedItemOptions.map((option, index) => {
            const selectedOption = itemOptionLists.find(opt => opt.name === option.option_type);

            return (
              <div key={index} className="border border-base-100 rounded-xl p-3 flex flex-col gap-3">
                <div className="flex gap-3">
                  <label className="label w-16">옵션</label>
                  <select
                    className="select w-full "
                    value={option.option_type || ""}
                    onChange={e => setSelectedItemOptions(index, { option_type: e.target.value })}>
                    <option value="">옵션 타입 선택</option>
                    {itemOptionLists.map(optionList => (
                      <option key={optionList.name} value={optionList.name}>
                        {optionList.displayName ? optionList.displayName : optionList.name}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedOption && (
                  <OptionIndex
                    selectedOption={selectedOption}
                    option={option}
                    index={index}
                    setSelectedItemOptions={setSelectedItemOptions}
                  />
                )}
              </div>
            );
          })}

          <div className="divider m-0 p-0"></div>

          <div className="modal-action">
            <form method="dialog" className="flex gap-3">
              <button className="btn btn-neutral absolute top-4 right-6">닫기</button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  clearItemOptions();
                  setIsFilter(false);
                }}>
                초기화
              </button>

              <button type="button" className="btn btn-primary" onClick={addItemOption}>
                옵션 추가
              </button>

              <button
                onClick={() => {
                  const filterConfirm = confirm("해당 조건으로 검색하시겠습니까?");

                  filterConfirm ? setIsFilter(true) : null;
                }}
                className="btn btn-primary">
                확인
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
