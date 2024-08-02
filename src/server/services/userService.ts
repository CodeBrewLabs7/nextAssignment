export const userService = {
    authenticate,
  };
  

  // a function that will run to authenticate the user. and will also to authorize it. 
  async function authenticate(username: string, password: string) {
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    
    // simple auth token can be further be applied to the server and make a authentication according to that 
    if(!res.ok) { //(1)
       return null
    }

    const result = await res.json();
          
    const data = {
      id:result.id,
      name:result.username,
      email:result.email,
      image:result.image,
    }
    return data; //(4) 
  }