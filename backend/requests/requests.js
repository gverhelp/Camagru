const baseUrl = "http://127.0.0.1/Camagru/backend/APICalls/";

/*##########################################################################*/
/*##########################################################################*/
/*####                                Get                               ####*/
/*##########################################################################*/
/*##########################################################################*/

export async function getProfileData(id) {
    let returnData = []
    try {
        const userDataResponse = await fetch(`${baseUrl}get_user_data.php?userId=${id}`);
        if (!userDataResponse.ok) {
            throw new Error(`HTTP error! Status: ${userDataResponse.status}`);
        }

        const userDataJSON = await userDataResponse.json();
        returnData['userData'] = userDataJSON.userData;

        const userPostsResponse = await fetch(`${baseUrl}get_user_posts_data.php?userId=${id}`);
        if (!userPostsResponse.ok) {
            throw new Error(`HTTP error! Status: ${userPostsResponse.status}`);
        }

        const userPostsDataJSON = await userPostsResponse.json();

        returnData['userData']['userPostsData'] = userPostsDataJSON.userPostsData;
        return returnData;

    } catch (error) {
        throw new Error(`Error fetching user data: ${error}`);
    }
}

export async function getUserData(userID) {
    try {
        const response = await fetch(`${baseUrl}get_user_data.php?userId=${userID}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.userData;

    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}

export async function getTheme(userID) {
    try {
        const response = await fetch(`${baseUrl}get_user_data.php?userId=${userID}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.userData.theme;

    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}

export async function getHomeData() {
    let returnData = [];
    try {
        const postsDataResponse = await fetch(`${baseUrl}get_all_posts_data.php`);
        if (!postsDataResponse.ok) {
            throw new Error(`HTTP error! Status: ${postsDataResponse.status}`);
        }

        const postsDataJSON = await postsDataResponse.json();
        returnData['postsData'] = postsDataJSON.postsData;

        for (let i = 0; i < returnData['postsData'].length; i++) {
            const userDataResponse = await fetch(`${baseUrl}get_user_data.php?userId=${returnData['postsData'][i]['userID']}`);
            if (!userDataResponse.ok) {
                throw new Error(`HTTP error! Status: ${userDataResponse.status}`);
            }
    
            const userDataJSON = await userDataResponse.json();
            returnData['postsData'][i]['avatarURL'] = userDataJSON['userData']['avatarURL'];
            returnData['postsData'][i]['username'] = userDataJSON['userData']['username'];
        }

        return returnData['postsData'];

    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}

/*##########################################################################*/
/*##########################################################################*/
/*####                              Update                              ####*/
/*##########################################################################*/
/*##########################################################################*/

export async function updateAvatar(userID, avatarURL) {
    try {
        const response = await fetch(`${baseUrl}update_avatar.php?userId=${userID}&avatarURL=${avatarURL}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}

export async function updateThemeData(userID, theme) {
    try {
        const response = await fetch(`${baseUrl}update_theme.php?userId=${userID}&theme=${theme}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}

export async function updatePostLike(userID, postID) {
    try {
        const response = await fetch(`${baseUrl}update_post_like.php?userId=${userID}&postId=${postID}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}

/*##########################################################################*/
/*##########################################################################*/
/*####                               Sign                               ####*/
/*##########################################################################*/
/*##########################################################################*/

export async function signUp(username, email, password) {
    try {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);

        const response = await fetch(`${baseUrl}signup.php`, {
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

        const response = await fetch(`${baseUrl}signin.php`, {
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