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
                      <th>Mordify</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>183</td>
                      <td>John Doe</td>
                      <td>11-7-2014</td>
                      <td><span class="tag tag-success">Approved</span></td>
                      <td>
                          <a href="#">
                               <i class="fa fa-edit blue"></i>
                          </a>
                          /
                          <a href="#">
                               <i class="fa fa-trash red"></i>
                          </a>
                          <a href=""></a>
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
              <form @submit.prevent="createUser">
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
                                class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                            <div v-if="form.errors.has('name')" v-html="form.errors.get('name')" />
                        </div>

                        <div class="form-group">
                            <textarea v-model="form.bio" name="bio" id="bio"
                            placeholder="Short bio for user (Optional)"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                            <div v-if="form.errors.has('name')" v-html="form.errors.get('name')" />
                        </div>


                        <div class="form-group">
                            <select name="type" v-model="form.type" id="type" class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                                <option value="">Select User Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">Standard User</option>
                                <option value="author">Author</option>
                            </select>
                            <div v-if="form.errors.has('name')" v-html="form.errors.get('name')" />
                        </div>

                        <div class="form-group">
                            <input v-model="form.password" type="password" name="password" id="password"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                            <div v-if="form.errors.has('name')" v-html="form.errors.get('name')" />
                        </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-success">Update</button>
                    <button type="button" class="btn btn-primary">Create</button>
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
         async createUser(){
            const response = await this.form.post('/api/user')
            console.log(this.form)
          },
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
