
import React, { Fragment, useEffect, useState ,useRef} from "react";
import { PDFDownloadLink, Page, Text, Document, StyleSheet, View ,Image } from '@react-pdf/renderer';

import logo from '../../logo.png';
 
const GenerateInvoice = ({ order  }) => (

    <Document>
    <Page style={styles.page}>
    <View style={styles.header}>
      <Text style={styles.dropSellText}>DropSell Invoice</Text>
      <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.col9}>
            <Text style={styles.invoiceId}>Invoice ID: {order._id}</Text>
          </View>

        </View>
        <View style={styles.row}>
          <View style={styles.col}>
          

          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col8}>
            <Text style={styles.addressHeading}>To: {order.user && order.user.name}</Text>
            <Text style={styles.address}>City: {order.shippingInfo && order.shippingInfo.city}</Text>
            <Text style={styles.address}>Adress: {order.shippingInfo && order.shippingInfo.adress}</Text>
            <Text style={styles.address}>Phone Number : {order.shippingInfo && order.shippingInfo.phoneNumber}</Text>
          </View>
          <View style={styles.col4}>
            <Text style={styles.invoiceDetails}><Text style={styles.circle}></Text>Creation Date: {order.paymentInfo && order.paymentInfo.createdAt.substring(0, 10)}</Text>
            <Text style={styles.invoiceDetails}><Text style={styles.circle}></Text>Delivered At : {order.paymentInfo && order.paymentInfo.deliveredAt.substring(0, 10)}</Text>
            <Text style={styles.invoiceDetails}><Text style={styles.circle}></Text>Status: <Text style={styles.badge}>Payment on delivery</Text></Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <View style={styles.table}>
              <View style={styles.tableRowHeader}>
                <Text style={styles.tableHeader}>#</Text>
                <Text style={styles.tableHeader}>Product</Text>
                <Text style={styles.tableHeader}>Qty</Text>
                <Text style={styles.tableHeader}>Unit Price</Text>
                <Text style={styles.tableHeader}>Amount</Text>
              </View>
              {order.orderItems && order.orderItems.map((item,index) => (
              <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCell}>{index +1 }</Text>
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>{item.quantity}</Text>
              <Text style={styles.tableCell}>{item.price}</Text>
              <Text style={styles.tableCell}>{item.quantity * item.price}</Text>
            </View>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col3}>
            <Text style={styles.shipping}>Shipping: {order.paymentInfo && order.paymentInfo.shippingPrice} DT</Text>
           
            <Text style={styles.total}>Total Amount: {order.paymentInfo && order.paymentInfo.totalPrice} DT</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col9}>
            <Text style={styles.thankYou}>Thank you for your purchase</Text>
          </View>
          <View style={styles.col3}>
            <Text style={styles.payNow}>Client signature</Text> <br></br> 
            <br></br>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);


const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: 40,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center"
  },
  container: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  col: {
    flex: 1,
  },
  col9: {
    flex: 0.9,
  },
  col8: {
    flex: 0.8,
  },
  col4: {
    flex: 0.4,
  },
  col3: {
    flex: 0.3,
  },
  button: {
    backgroundColor: "#e9ecef",
    borderRadius: 4,
    padding: 5,
    marginRight: 5,
    textAlign: "center",
  },
  invoiceId: {
    color: "#7e8d9f",
    fontSize: 20,
  },
  logo: {
    color: "#5d9fc5",
    fontSize: 20,
  },
  addressHeading: {
    color: "#5d9fc5",
    fontSize: 12,
    marginBottom: 5,
  },
  address: {
    color: "#000",
    fontSize: 12,
    marginBottom: 2,
  },
  invoiceDetailsHeading: {
    color: "#000",
    fontSize: 12,
    marginBottom: 5,
  },
  invoiceDetails: {
    color: "#000",
    fontSize: 12,
    marginBottom: 2,
  },
  circle: {
    width: 8,
    height: 8,
    backgroundColor: "#84B0CA",
    borderRadius: "50%",
    display: "inline-block",
    marginRight: 5,
  },
  badge: {
    backgroundColor: "#f0ad4e",
    color: "#000",
    fontWeight: "bold",
    padding: "3px 6px",
  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
  },
  tableRowHeader: {
    flexDirection: "row",
    backgroundColor: "#84B0CA",
    color: "#fff",
    fontWeight: "bold",
    padding: 5
  },
  tableHeader: {
      flex: 1,
      padding: 5,
    },
    tableRow: {
      flexDirection: "row",
      borderBottom: "1px solid #000",
      padding: 5,
    },
    tableCell: {
      flex: 1,
      padding: 5,
    },
    notes: {
      marginLeft: 10,
      fontSize: 12,
    },
    total: {
      fontSize: 12,
      
    },
    thankYou: {
      fontSize: 12,
      marginLeft: 10,
    },
    payNow: {
      color: "#000",
      fontSize: 12,
      marginBottom: 2,
    },

   
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    dropSellText: {
      fontSize: 20,
      marginLeft: 10,
    },
    logo: {
      width: 50,
      height: 50,
      marginRight: 10,
      alignSelf: "flex-end",
    },
    shipping: {
      fontSize: 12,
      marginBottom: 5,
    }
  });
  
  // Usage
  const MyComponent = () => {
    const order = { _id: "123456789", shippingInfo: { address: " Street, City, State, Country" } };
  
    return (
      <div>
        <PDFDownloadLink document={<GenerateInvoice order={order} />} fileName="invoice.pdf">
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
        </PDFDownloadLink>
      </div>
      
    );
  };

    export default GenerateInvoice;