  const auth = {
    onAuthStateChanged(cb) {
      console.log('onAuthStateChanged');
      return this.user?.email === 'undefined' ? null : this.user;
    },
    signInWithEmailAndPassword(email, passwd) {
      console.log('signInWithEmailAndPassword');
      this.user = {email, passwd};
    },
    signOut(cb) {
      console.log('signOut');
      this.user = null;
    },    
    user: {'email':'dogtoo.lin@gmail'},
  };


export {auth};