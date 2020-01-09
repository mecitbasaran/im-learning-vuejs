const app = new Vue({
    el: '#app',
    name: 'Uzaktan Kurs',
    data: {
        activeUser: {},
        users: [
            {
                userId: 25,
                userName: 'Mecit',
                userRole: 'Admin'
            },
            {
                userId: 42,
                userName: 'Ali',
                userRole: 'User'
            },
            {
                userId: 15,
                userName: 'Kenan',
                userRole: 'User'
            }
        ]
    },
    methods: {
        openUserModal() {
            this.activeUser={ userRole: '' };
            $('#userModal').modal('show');
        },
        saveUser() {
            if (this.activeUser.userName != undefined && this.activeUser.userRole != '') {

                if (this.activeUser.userId>0){
                    let user = this.users.find(x=>x.userId == this.activeUser.userId);
                    user = this.activeUser;

                } else {
                    this.users.push({
                        userId: Math.floor(Math.random() * 50 + 1), // random userId belirletiyorum.
                        userName: this.activeUser.userName,
                        userRole: this.activeUser.userRole
                    });
                }

                this.activeUser = {};
                $('#userModal').modal('hide');
            }
        },
        deleteUser(index) {
            this.users.splice(index, 1);
        },
        deleteUser2(userId) {
            const user = this.users.find(x=>x.userId == userId);
            if (user != null) {
                this.users = this.users.filter(x=>x.userId != user.userId);
            }
        },
        updateUser(index) {
            this.activeUser = this.users[index];
            $('#userModal').modal('show');
        },
    }
});