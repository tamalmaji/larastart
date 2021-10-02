<template>
    <div class="container">
       <div class="row mt-5">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">User Table</h3>

                <div class="card-tools">
                    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addNew">Add New <i class="fas fa-user-plus fa-fw"></i></button>
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
                          <a href="#">
                               <i class="fa fa-edit blue"></i>
                          </a>
                          /
                          <a href="#">
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
                  <h5 class="modal-title" id="addNewLabel">Add New</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form @submit.prevent="createUser" @keydown="form.onKeydown($event)">
                <div class="modal-body">
                  <div class="form-group">
                      <input v-model="form.name" type="text" name="name"
                                placeholder="Name"
                                class="form-control">
                        <div v-if="form.errors.has('name')" v-html="form.errors.get('name')" />
                    </div>
                    
                        <div class="form-group">
                            <input v-model="form.email" type="email" name="email"
                                placeholder="Email Address"
                                class="form-control">
                            <div v-if="form.errors.has('email')" v-html="form.errors.get('email')" />
                        </div>

                        <div class="form-group">
                            <textarea v-model="form.bio" name="bio" id="bio"
                            placeholder="Short bio for user (Optional)"
                            class="form-control"></textarea>
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
                            class="form-control" placeholder="Password">
                            <div v-if="form.errors.has('password')" v-html="form.errors.get('password')" />
                        </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-success">Update</button>
                    <button type="submit" class="btn btn-primary">Create</button>
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
        loadUsera(){
            axios.get("/api/user").then(({ data }) => (this.users = data)) 
          },
         async createUser(){
            const response = await this.form.post('/api/user')
            
          },
        },
        created() {
           this.loadUsera();
        }
    }
</script>
