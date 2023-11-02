export async function getUserData(id) {
  try {
    const response = await fetch(`get_user_data.php?userId=${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null; // Handle the error or return a default value as needed
  }
}