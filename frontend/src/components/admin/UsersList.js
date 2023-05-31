import { MDBDataTable } from "mdbreact";
import React, { Fragment, useEffect , useState} from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { allUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstantes";
import Infos from "../layout/Infos";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function UsersList() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector(state => state.user);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  
  const deleteUserHandler = (id) => {
    setUserToDelete(id);
    setShowConfirmation(true);
  };
  
  const confirmDelete = () => {
    dispatch(deleteUser(userToDelete));
    setShowConfirmation(false);
  };
  
  const cancelDelete = () => {
    setUserToDelete(null);
    setShowConfirmation(false);
  };

  useEffect(() => {
    dispatch(allUsers());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success('User deleted successfully');
      navigate('/admin/users');
      dispatch({ type: DELETE_USER_RESET })
  }
  }, [dispatch, alert, error,navigate,isDeleted]);

  /* const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  }; */

  const setUsers = () => {
    const data = {
      columns: [
        { label: "User ID", field: "id", sort: "asc" },
        { label: "Name ", field: "name", sort: "asc" },
        { label: "Email", field: "email", sort: "asc" },
        { label: "Role", field: "role", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],

      rows: [],
    };

    if (users) {
      users.forEach((user) => {
        data.rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,

          actions: (
            <Fragment>
              <Link
                to={`/admin/user/${user._id}`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-pencil"></i>
              </Link>

              <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteUserHandler(user._id)}>
                <i className="fa fa-trash"></i>
              </button>
            </Fragment>
          ),
        });
      });
    }

    return data;
  };

  return (
    <Fragment>
      <Infos title={"All users"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5"> All users</h1>

            {loading ? (
              <Loader />
            ) : (
              <Fragment>
              <MDBDataTable
                data={setUsers()}
                className="px-3"
                bordered
                striped
                hover
              />
              <Modal show={showConfirmation} onHide={cancelDelete}>
                    <Modal.Header closeButton>
                      <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Are you sure you want to delete this user ?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={cancelDelete}>
                        Cancel
                      </Button>
                      <Button variant="danger" onClick={confirmDelete}>
                        Delete
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Fragment>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
}

export default UsersList;
