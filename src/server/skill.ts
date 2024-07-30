export async function getAllSkillData() {
  try {
    const response = await fetch(`http://localhost:3000/api/skill`, {
      headers: {
        Accept: "application/json",
        method: "GET",
      },
    });
    if (response) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getFitsSkillData(category: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/skill/${category}`, {
      headers: {
        Accept: "application/json",
        method: "GET",
      },
    });
    if (response) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.log(err);
  }
}
