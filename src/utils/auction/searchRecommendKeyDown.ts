export default function searchRecommendKeyDown(
  event: React.KeyboardEvent<HTMLInputElement>,
  isDropdownVisible,
  filteredLists,
) {
  if (!isDropdownVisible || filteredLists.length === 0) return;

  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      setSelectedIndex(prevIndex => (prevIndex === null || prevIndex === filteredLists.length - 1 ? 0 : prevIndex + 1));
      break;
    case "ArrowUp":
      event.preventDefault();
      setSelectedIndex(prevIndex => (prevIndex === null || prevIndex === 0 ? filteredLists.length - 1 : prevIndex - 1));
      break;
    case "Enter":
      event.preventDefault();
      if (selectedIndex !== null) {
        const selectedItem = filteredLists[selectedIndex];
        setRecommendInputText(selectedItem.name);
        setValue("inputText", selectedItem.name);
        setDropdownVisible(false);
        setSelectedIndex(null);
      }
      break;
    case "Escape":
      setDropdownVisible(false);
      setSelectedIndex(null);
      break;
  }
}
