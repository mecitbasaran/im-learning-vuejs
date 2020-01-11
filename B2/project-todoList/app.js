const app = new Vue({
    el: '#app',
    name: 'Uzaktan Kurs',
    data: {
        todoItem: { todoTitle: '', todoStatus: false},
        dataTodoList: [
            {  todoId: 1 , todoTitle: 'Ders notlarını hazırla.', todoStatus: true, categoryName: 'İş' },
            {  todoId: 2 , todoTitle: 'Intro hazırla.', todoStatus: false, categoryName: 'İş' },
            {  todoId: 3 , todoTitle: 'Kahve al.', todoStatus: false, categoryName: 'Genel' }
        ],
        categoryList: [
            { categoryId: 1, categoryName: 'Genel' },
            { categoryId: 2, categoryName: 'İş' },
            { categoryId: 3, categoryName: 'Özel' }
        ],
        activeCategory: {},
        filteredDataTodoList: [],
        newCategory: {}
    },
    created() {
        const defaultSelectedCategory = this.categoryList[0];
        if (defaultSelectedCategory != null) {
            this.changeCategory(defaultSelectedCategory)
        }
    },
    methods: {
        toggleTodoListStatus(index){
            this.todoList[index].todoStatus = !this.todoList[index].todoStatus;
        },
        togglecompletedTodoListStatus(index){
            this.completedTodoList[index].todoStatus = !this.completedTodoList[index].todoStatus;
        },
        saveNewTodo() {
            if (this.todoItem.todoTitle !== '') {
                this.todoItem.todoId = this.dataTodoList.length + 1;
                this.todoItem.categoryName = this.activeCategory.categoryName;
                this.dataTodoList.push(this.todoItem);
                this.clearForm();
                this.changeCategory(this.activeCategory);
            }
        },
        clearForm() {
            this.todoItem = { todoTitle: '', todoStatus: false};
        },
        deleteTodo(Id) {
            this.dataTodoList = this.dataTodoList.filter(x => x.todoId !== Id);      
            this.changeCategory(this.activeCategory);

        },
        changeCategory(category) {
            if (category !== null){
                this.activeCategory = category;
                this.filteredDataTodoList = this.dataTodoList.filter(x => x.categoryName === category.categoryName)
            }
        },
        saveNewCategory() {
            if (this.newCategory.categoryName != null) {
                this.newCategory.categoryId = this.categoryList.length + 1;
                this.categoryList.push(this.newCategory);
                this.newCategory = {};
            }
        },
        categoryTodoCount(_categoryName) {
            return this.dataTodoList.filter(x => x.categoryName === _categoryName).length;
        }
    },
    computed: {
        todoList() {
            return this.filteredDataTodoList.filter(t => t.todoStatus === false);
        },
        completedTodoList() {
            return this.filteredDataTodoList.filter(t => t.todoStatus === true);
        }
    }
})