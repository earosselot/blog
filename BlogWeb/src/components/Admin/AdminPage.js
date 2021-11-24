import AdminHeader from './AdminHeader';
import AdminMain from './AdminMain';
import AdminFooter from './AdminFooter';

function AdminPage({ userApi }) {
  return (
    <div>
      <AdminHeader userApi={userApi} />
      <AdminMain />
      <AdminFooter />
    </div>
  );
}

export default AdminPage;
