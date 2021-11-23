export const editUsersData = (editedUserData, currentUser, usersData) => {
    return usersData.map(userData => {
        if(userData.email === currentUser.email) {
            return editedUserData
        } else {
            return userData
        }
    })
};

export const editUserPassword = (editedUserPassword, currentUser, usersData) => {
    return usersData.map(userData => {
        if(userData.email === currentUser.email) {
            return { ...userData, password: editedUserPassword }
        } else {
            return userData
        }
    })
};


