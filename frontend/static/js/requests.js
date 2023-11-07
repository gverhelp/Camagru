export async function getUserData(id) {
  try {
    const response = await fetch(`get_user_data.php?userId=${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
        throw new Error(`Error fetching user data: ${error}`);
    // return null; // Handle the error or return a default value as needed
  }
}

export async function changeAvatar(id, avatarURL) {
    try {
        const response = await fetch(`change_avatar.php?userId=${id}&avatarURL=${avatarURL}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const userData = await response.json();
        return userData;
      } catch (error) {
          throw new Error(`Error fetching data: ${error}`);
      }
}

export async function signUp(username, email, password) {
    try {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);

        const response = await fetch("signup.php", {
            method: "POST",
            body: formData,
        })
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}

export async function signIn(username, password) {
  try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const response = await fetch("signin.php", {
          method: "POST",
          body: formData,
      })
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
  } catch (error) {
      throw new Error(`Error fetching data: ${error}`);
  }
}