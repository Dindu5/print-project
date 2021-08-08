import { useContext } from "react";
import UsersTable from "../components/UsersTable";
import { OrganisationContext } from "../context/OrganisationContext";

function ManageUsers() {
  const { organisation } = useContext(OrganisationContext);
  return (
    <div>
      <UsersTable users={organisation.users} />
    </div>
  );
}

export default ManageUsers;
