import { userService } from "../services/user.service";

export function Profile() {
    const loggedUser = userService.getLoggedUser()
    return <section>Profile for: {loggedUser.fullname}</section>;
}
