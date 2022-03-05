import Todo from "./Todo";

export default class App {
    constructor() {
      console.log("🍕");

      // HINT🤩
      // set up the enter Key
      // this.setupEventListeners();
      // when the app loads, we can show previously saved items from localstorage
      // this.loadFromStorage();

      this.setupEventListeners();
      this.loadFromStorage();
    }
  
    setupEventListeners() {
      console.log("👂🏽");

      // HINT🤩
      // pressing the enter key in the text field triggers the createItem function
      // addEventListener("keyup", this.createItem.bind(this));
      // read up on .bind() -> we need to pass the current meaning of this to the eventListener
      // while testing, feel free to console.log(this) to see what's in it

      document.querySelector("#add-item-text").addEventListener("keyup", this.createItem.bind(this));
      // console.log(this);
    }
  
    createItem(e) {
      // HINT🤩
      // this function should create a new todo by using the Todo() class
      // new Todo(text)
      // todo.add();
      // todo.saveToStorage();
      // if you used bind() in the previous function, you'll notice that this refers to the current class instance
      // clear the text field with .reset() after adding the item
      // if (e.key === "Enter")

      if(e.key === "Enter") {
        
        console.log("📕");
        let todo = new Todo();
        todo.add();
        // console.log(todo);
        todo.saveToStorage();

        this.reset();
      }
    }
  
    loadFromStorage() {
      // HINT🤩
      // load all items from storage here and add them to the screen
      // use the Todo class to create the elements

      // useful link: https://stackoverflow.com/questions/17745292/how-to-retrieve-all-localstorage-items-without-knowing-the-keys-in-advance

      let items = [],
        keys = Object.keys(localStorage),
        i = keys.length;
    
        while( i-- ) {
          items.push(localStorage.getItem(keys[i]));
        }
        for(let item of items) {
          let todo = new Todo(item.title);
          todo.add();
        }
    }
  
    reset() {
      // this function should reset the form / clear the text field

      document.querySelector("#add-item-text").value = "";
    }
}
  