import { createSelector } from "reselect";

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
   [selectUser],
   (user) => user.currentUser
);

export const selectUsersData = createSelector(
   [selectUser],
   (user) => user.usersData
);

export const selectIsLoading = createSelector(
   [selectUser],
   (user) => user.isLoading
);

export const selectIsSuccess = createSelector(
   [selectUser],
   (user) => user.isSuccess
);

export const selectFailureMessage = createSelector(
   [selectUser],
   (user) => user.failureMessage
);

export const selectIsSigningUp = createSelector(
   [selectUser],
   (user) => user.isSigningUp
);

export const selectIsSigningIn = createSelector(
   [selectUser],
   (user) => user.isSigningIn
);





