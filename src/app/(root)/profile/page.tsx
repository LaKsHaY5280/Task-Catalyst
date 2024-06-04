import { getCurrentUser } from "@/lib/actions/user";

const ProfilePage = async () => {
  const user = await getCurrentUser();
  return (
    <div>
      <h1>Edit Profile</h1>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />

        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProfilePage;
