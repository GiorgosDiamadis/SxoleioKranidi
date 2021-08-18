import React from "react";

export default function Footer() {
    return (
        <footer className="footer-distributed">
            <p className="footer-company-name">Created by Diamadis Giorgos © 2021</p>
            <div className={"ml-10"}>
                <i className="fa fa-phone"></i>
                <p className={"inline-block ml-3"}>6955038094</p>
            </div>
            <div className={"ml-10"}>
                <i className="fa fa-envelope"></i>
                <p className={"inline-block ml-3"}><a href="mailto:support@company.com">diamantisgiorgos2@gmail.com</a></p>
            </div>


        </footer>
    );
}
