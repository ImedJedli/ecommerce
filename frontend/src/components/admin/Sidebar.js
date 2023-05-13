import React from 'react'
import {Link} from 'react-router-dom'


const Sidebar =() => {
  return (
      <div className="sidebar-wrapper">
      <nav id="sidebar">
          <ul className="list-unstyled components">
              <li>
                  <Link to="/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link>
              </li>

              <li>
                  <a href="#blogSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                      className="fa fa-product-hunt"></i> Blogs</a>
                  <ul className="collapse list-unstyled" id="blogSubmenu">
                      <li>
                          <Link to="/admin/blogs"><i className="fa fa-clipboard"></i> All</Link>
                      </li>

                      <li>
                          <Link to="/admin/blog/new"><i className="fa fa-plus"></i> Create</Link>
                      </li>
                  </ul>
              </li>


              <li>
                  <a href="#categoriesSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                      className="fa fa-product-hunt"></i> Categories</a>
                  <ul className="collapse list-unstyled" id="categoriesSubmenu">
                      <li>
                          <Link to="/categories"><i className="fa fa-clipboard"></i> All</Link>
                      </li>

                      <li>
                          <Link to="/admin/category"><i className="fa fa-plus"></i> Create</Link>
                      </li>
                  </ul>
              </li>

    

              <li>
                  <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                      className="fa fa-product-hunt"></i> Products</a>
                  <ul className="collapse list-unstyled" id="productSubmenu">
                      <li>
                          <Link to="/admin/products"><i className="fa fa-clipboard"></i> All</Link>
                      </li>

                      <li>
                          <Link to="/admin/product/new"><i className="fa fa-plus"></i> Create</Link>
                      </li>
                  </ul>
              </li>

              <li>
                  <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Orders</Link>
              </li>

              <li>
                  <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
              </li>

              <li>
                  <Link to="/admin/reviews"><i className="fa fa-star"></i> Reviews</Link>
              </li>



          </ul>
      </nav>
  </div>
  )
}

export default Sidebar
