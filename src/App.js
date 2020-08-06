import React from 'react';
import Cart from './Cart';
import Navbar from'./Navbar';
import * as firebase from 'firebase';

class App extends React.Component {

  constructor(){
    super();
    this.state={
      products: [],
      loading : true
    }
    this.db=firebase.firestore();
  }

  componentDidMount(){
    // firebase
    //   .firestore()
    //   .collection('products')
    //   .get()
    //   .then((snapshot) => {
    //     console.log(snapshot);
    //
    //     snapshot.docs.map((doc) => {
    //       console.log(doc.data())
    //     });
    //
    //     const products = snapshot.docs.map((doc) => {
    //       const data = doc.data();
    //
    //       data['id'] = doc.id;
    //       return data;
    //     })
    //     this.setState({
    //       products,
    //       loading: false
    //     })
    //   })

    this.db
      .collection('products')
      .onSnapshot((snapshot) => {
        console.log(snapshot);

        snapshot.docs.map((doc) => {
          console.log(doc.data())
        });

        const products = snapshot.docs.map((doc) => {
          const data = doc.data();

          data['id'] = doc.id;
          return data;
        })
        this.setState({
          products,
          loading: false
        })
      })
  }


  // Increase Cart quantity
  handleIncreaseQuantity = (product) => {
    console.log('just increase the quantity', product);
    const { products }=this.state;
     const index=products.indexOf(product);

     // products[index].qty+=1;
     //
     // this.setState({
     //   products
     // })
     const docRef = this.db.collection('products').doc(products[index].id)

     .update({
       qty: products[index].qty + 1
     })
     .then(() => {
       console.log('updated successfully')
     })
     .catch((error) => {
       console.log('Error: ',error);
     })
  }


  //Decrease Cart quantity
  handleDecreaseQuantity = (product) => {
    console.log('just decrease the quantity', product);
    const { products }=this.state;
     const index=products.indexOf(product);

     if(products[index].qty===0)
     {
       return;
     }
     //
     // products[index].qty-=1;
     //
     // this.setState({
     //   products
     // })
     const docRef = this.db.collection('products').doc(products[index].id)

     .update({
       qty: products[index].qty - 1
     })
     .then(() => {
       console.log('updated successfully')
     })
     .catch((error) => {
       console.log('Error: ',error);
     })
  }


  // Delete Cart item
  handleDeleteProduct = (id) => {
    const { products } = this.state;

    // const items = products.filter((item) => item.id !== id);
    //
    // this.setState({
    //   products:items
    // })
    const docRef = this.db.collection('products').doc(id)

    docRef
    .delete()
    .then(() => {
      console.log('Deleted successfully')
    })
    .catch((error) => {
      console.log('Error: ',error);
    })
  }

  getCartCount =() =>{
    const{ products }=this.state;

    let count = 0;

    products.forEach((product) => {
      count+=product.qty;
    })

    return count;
  }

getCartTotal = () => {
  const{ products } = this.state;
  let cartTotal = 0;

  products.map((product) => {
    cartTotal = cartTotal + product.qty * product.prices
  })

  return cartTotal;
}

  addProduct = () => {
    this.db
    .collection('products')
    .add({
      img: '',
      prices:100,
      qty:3,
      title:'washing machine'
    })
    .then((docRef) =>{
      console.log('product has been added',docRef);
    })
    .catch((error) =>{
      console.log('Error :',error);
    })
  }

render(){
  const { products , loading} = this.state;
    return (
      <div className="App">
      <Navbar count={this.getCartCount()}/>
      <Cart
      products={products}
      onIncreaseQuantity={this.handleIncreaseQuantity}
      onDecreaseQuantity={this.handleDecreaseQuantity}
      onDeleteProduct={this.handleDeleteProduct}
       />
       {loading && <h1>Loading Products . . .</h1>}
       <div style={ {fontSize: 30,float:'right',padding:10} } >TOTAL: {this.getCartTotal()}</div>
      </div>
  );
}
}

export default App;
