/*##########################################################################*/
/*##########################################################################*/
/*####                                Get                               ####*/
/*##########################################################################*/
/*##########################################################################*/

export async function getUserData(id) {
    try {
        const response = await fetch(`get_user_data.php?userId=${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.userData;

    } catch (error) {
        throw new Error(`Error fetching user data: ${error}`);
    }
}

export async function getTheme(id) {
    try {
        const response = await fetch(`get_user_data.php?userId=${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.userData.theme;

    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}

/*##########################################################################*/
/*##########################################################################*/
/*####                              Update                              ####*/
/*##########################################################################*/
/*##########################################################################*/
export async function updateAvatar(id, avatarURL) {
    try {
        const response = await fetch(`change_avatar.php?userId=${id}&avatarURL=${avatarURL}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}

export async function updateThemeData(id, theme) {
    try {
        const response = await fetch(`change_theme.php?userId=${id}&theme=${theme}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

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