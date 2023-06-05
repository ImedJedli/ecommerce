import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { Segment, Button } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeProvider } from 'styled-components';

import { faRobot } from "@fortawesome/free-solid-svg-icons";
function Chatbot() {
  const [showChatbot, setShowChatbot] = useState(false);


  const theme = {
      headerTitle:"DropSell ",
      background: '#f5f8fb',
      fontFamily: 'Arial',
      headerBgColor: '#5c63af',
      headerFontColor: '#fb5c42',
      headerFontSize: '15px',
      botBubbleColor: '#5c63af',
      botFontColor: '#fff',
      userBubbleColor: '#fff',
      userFontColor: '#4a4a4a',
   
    };


  const steps =[
      {
        id:"Hello",
        message: "Welcome to DropSell",
        trigger: 'Ask Name'
      },
      {
        id:"Ask Name",
        message:"Please enter your name",
        trigger: "waiting"
      },
      {
        id:"waiting",
        user:true,
        trigger:"Name"
      },
      {
        id:"Name",
        message:"Hi {previousValue}, Can i help you with anything",
        trigger:"Issues"
      },
      {
        id:"Issues",
        options :[
        {value:0,label: "No", trigger: "bye"},
        {value:1,label: "Account informations" , trigger: "accountInfo"},
        {value:2,label: "Order informations", trigger: "orderInfo"},
        {value:3,label: "Shipping informaions", trigger: "shippingInfo"},
        {value:4,label: "What payment methods do you accept?", trigger: "paymentInfo"},
        {value:5,label: "How can i contact customer support?", trigger: "contactSupport"},
        {value:6,label: "How can i leave a review on a product", trigger: "reviewInfo"},
      ]
      },

      {
            id:"bye",
            message:"Have a nice day , and thank you for choosing DropSell.",
            end:true,
      },
   
      {
        id:"paymentInfo",
        message:"For the moment we only accept payment upon delivery.",
        end:true
      },

   

          {
            id:"contactSupport",
            message:"You can reach our customer support team by emailing support@example.com or by calling our toll-free number at +216 XX XXX XXX.",
            end:true
          },

          {
            id: "accountInfo",
            options: [
              { value: 1, label: "How to register", trigger: "howToRegister" },
              { value: 2, label: "How to reset password", trigger: "howToResetPassword" },
            ],
          },


          {
            id: "howToRegister",
            message: "To register on our website, navigate to the Account page and click on 'Create a free account'. Fill in the required information and submit the form.",
            end: true,
          },
          {
            id: "howToResetPassword",
            message: "To reset your password, go to the Account page and click on the 'Forgot Password ?' link. Follow the instructions to reset your password.",
            end: true,
          },

          {
            id: "shippingInfo",
            options: [
              { value: 1, label: "How long does shipping take?", trigger: "shippingTime" },
              { value: 2, label: "How does shipping cost?", trigger: "shippingCost" },
            ],
          },

          {
            id: "shippingTime",
            message: "Shipping times vary depending on your location, Generally, it takes between 3 to 7 days for standard shipping.",
            end: true,
          },
          {
            id: "shippingCost",
            message: "Yes, if your order total amount is less than 300DT, you will need to pay 7DT for shipping. However, if your order total is 300DT or more, the shipping is free.",
            end: true,
          },


          {
            id: "orderInfo",
            options: [
              { value: 1, label: "Can I track my order?", trigger: "orderTrack" },
              { value: 2, label: "Can i apply a discount in my order", trigger: "orderDiscount" },
              { value: 3, label: "Can I cancel my order?", trigger: "orderCancelled" },
            ],
          },

          {
            id: "orderTrack",
            message: "Yes, you can track your order by checking your account on the orders page of our website.",
            end: true,
          },
          {
            id: "orderDiscount",
            message: "Yes, we have system of discount , you can find discount codes on our social media platforms. ",
            end: true,
          },
          {
            id: "orderCancelled",
            message: "Yes, you can cancel your order before it has been shipped. Please contact our customer support team as soon as possible to assist you with the cancellation. ",
            end: true,
          },

          {
            id:"reviewInfo",
            message:"To leave a review you must login or create and account.",
            end:true
          },
          

    ]
  const toggleChatbot = () => {
    setShowChatbot((prevShowChatbot) => !prevShowChatbot);
  };

  

  return (
      <ThemeProvider theme={theme}>
    <Segment floated="right">
      {showChatbot ? (
        <Segment
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 9999,
          }}
        >
          <ChatBot steps={steps} />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "30px",
              
            }}
          >
            <FontAwesomeIcon
              icon={faRobot}
              style={{
                position: "fixed",
                bottom: 20,
                right: 20,
                zIndex: 9999,
                fontSize: "24px",
                cursor: "pointer",
                
              }}
              onClick={toggleChatbot}
            />
          </div>
        </Segment>
      ) : (
        <FontAwesomeIcon
          icon={faRobot}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 9999,
            fontSize: "24px",
            color: "#5c63af",
            cursor: "pointer",
          }}
          onClick={toggleChatbot}
        />
      )}
    </Segment>
           </ThemeProvider>
     
  );
}

export default Chatbot;
