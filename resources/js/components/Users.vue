<template>
    <div class="container">
       <div class="row mt-5">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">User Table</h3>

                <div class="card-tools">
                    <button class="btn btn-success" @click="newModal">Add New <i class="fas fa-user-plus fa-fw"></i></button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Registered  At</th>
                      <th>Mordify</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in users.data" :key="user.id">
                      <td>{{user.id}}</td>
                      <td>{{user.name}}</td>
                      <td>{{user.email}}</td>
                      <td>{{user.type | upText}}</td>
                      <td>{{user.created_at | myDate}}</td>
                      <td>
                          <a href="#" @click="editModal(user)">
                               <i class="fa fa-edit blue"></i>
                          </a>
                          /
                          <a href="#" @click="deleteUser(user.id)">
                               <i class="fa fa-trash red"></i>
                          </a>
                          
                      </td>
                    </tr>
                   
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
           <!-- Modal -->
        <div class="modal fade" id="addNew" tabindex="-1" aria-labelledby="addNewLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" v-show="!editmode" id="addNewLabel">Add New user</h5>
                  <h5 class="modal-title" v-show="editmode" id="addNewLabel">Update user's Info</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form @submit.prevent="editmode ? updateUser() : createUser()" @keydown="form.onKeydown($event)">
                <div class="modal-body">
                  <div class="form-group">
                      <input v-model="form.name" type="text" name="name"
                          placeholder="Name"
                          class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                        <div v-if="form.errors.has('name')" v-html="form.errors.get('name')" />
                    </div>
                    
                        <div class="form-group">
                            <input v-model="form.email" type="email" name="email"
                                placeholder="Email Address"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                            <div v-if="form.errors.has('email')" v-html="form.errors.get('email')" />
                        </div>

                        <div class="form-group">
                            <textarea v-model="form.bio" name="bio" id="bio"
                            placeholder="Short bio for user (Optional)"
                            class="form-control"  :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                            <div v-if="form.errors.has('bio')" v-html="form.errors.get('bio')" />
                        </div>


                        <div class="form-group">
                            <select name="type" v-model="form.type" id="type" class="form-control">
                                <option value="">Select User Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">Standard User</option>
                                <option value="author">Author</option>
                            </select>
                            <div v-if="form.errors.has('type')" v-html="form.errors.get('type')" />
                        </div>

                        <div class="form-group">
                            <input v-model="form.password" type="password" name="password" id="password"
                            class="form-control" placeholder="Password" :class="{ 'is-invalid': form.errors.has('password') }"
                                    >
                            <div v-if="form.errors.has('password')" v-html="form.errors.get('password')" />
                        </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    <button v-show="editmode" type="submit" class="btn btn-success">Update</button>
                    <button v-show="!editmode" type="submit" class="btn btn-primary">Create</button>
                </div>
              </form>
            </div>
        </div>
        </div>
        </div>
       
    </div>
</template>

<script>
    export default {
        data(){
            return {
              editmode: false,
                users: {},
                form: new Form({
                    id:'',
                    name : '',
                    email: '',
                    password: '',
                    type: '',
                    bio: '',
                    photo: ''
                })
            }
        },
        methods: {
          updateUser(){
            this.$Progress.start()
            // console.log('editingdata')
            this.form.put('api/user/' +this.form.id)
            .then(()=>{
              // success
                $('#addNew').modal('hide');
               Swal.fire(
                    'Updated!',
                    'Information has been updated.',
                    'success'
                  )
                this.$Progress.finish();
                Fire.$emit('AfterCreate');
            })
            .catch(() =>{
            this.$Progress.fail()

            })
          },
          editModal(user){
            this.editmode = true;
            this.form.reset();
            $('#addNew').modal('show');
            this.form.fill(user);
          },
          newModal(){
            this.editmode = false;
            this.form.reset();
            $('#addNew').modal('show');
          },
        deleteUser(id){
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            // Send request to the server
            this.form.delete('api/user/'+id).then(()=>{
               if (result.isConfirmed) {
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                  Fire.$emit('AfterCreate');
                }
            }).catch(()=>{
                Swal.fire(
                'Failed!',
                'There was something wronge.',
                'warning'
              )
              // swal.fire("Failed!", "There was something wronge.", "warning");
            })
           
          })
        },
        loadUsera(){
            axios.get("/api/user").then(({ data }) => (this.users = data)) 
          },
         async createUser(){
            this.$Progress.start()
            const response = await this.form.post('/api/user')
            .then(()=>{
                  Fire.$emit('AfterCreate');
                $('#addNew').modal('hide')
                toast.fire({
                  icon: 'success',
                  title: 'User Created successfully'
                })
                this.$Progress.finish()
            })
            .catch(()=>{
              
            })
            
          },
        },
        created() {
           this.loadUsera();
           
           Fire.$on('AfterCreate', () => {
           this.loadUsera();
           });
            // setInterval(() => this.loadUsera(), 3000);
        }
    }
</script>
