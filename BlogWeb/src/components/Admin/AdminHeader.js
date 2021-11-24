function AdminHeader({ userApi }) {

  function handleLogout() {
    userApi.logout();
  }

  return (
    <div>
      <h1>Blog Admin</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminHeader;
