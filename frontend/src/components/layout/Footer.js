import React, { Fragment } from 'react'

function Footer() {
  return (
    <Fragment>

        <br></br>
        <br></br>
        <div className="footer-container">
            <footer className="footer">
                <div className="container">
                <div className="row">
                        <div className="col-md-6 col-lg-4 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left mr-auto">
                        <div className="footer-widget">
                                <h4 className="mb-4">DropSell</h4>
                                <p className="lead">Iste dolores iure quis excepturi, deserunt praesentium.</p>
                                
                                <div className="">
                                    <p className="mb-0"><strong>Location : </strong>Tunisia</p>
                                    <p><strong>Support Email : </strong> support@email.com</p>
                                </div>
                        </div>
                        </div>
            
                    
            
                        <div className="col-md-6 col-lg-2 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left">
                            <div className="footer-widget">
                            <h4 className="mb-4">Useful Link</h4>
                            <ul className="pl-0 list-unstyled mb-0">
                            <li><a href="#">Products</a></li>
                            <li><a href="#">Blogs</a></li>
                            <li><a href="#">Cart</a></li>
                            <li><a href="#">About US</a></li>
                            <li><a href="#">Contact Us</a></li>
                            </ul>
                                </div>
                        </div>
            
              
                    </div>
                </div>
            </footer>
            
            
            <div className="footer-btm py-4 ">
                <div className="container">
                <div className="row ">
                        <div className="col-lg-6">
                            <p className="copyright mb-0 ">@ Copyright Reserved to therichpost &amp; made by <a href="https://therichpost.com/">therichpost</a></p>
                        </div>
                        <div className="col-lg-6">
                            <ul className="list-inline mb-0 footer-btm-links text-lg-right mt-2 mt-lg-0">
                            <li className="list-inline-item"><a href="#">Privacy Policy</a></li>
                            <li className="list-inline-item"><a href="#">Terms &amp; Conditions</a></li>
                            <li className="list-inline-item"><a href="#">Cookie Policy</a></li>
                            <li className="list-inline-item"><a href="#">Terms of Sale</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Footer