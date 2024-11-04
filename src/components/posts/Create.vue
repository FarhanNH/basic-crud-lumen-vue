<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="posts">
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">ADD POST</div>
            <div class="card-body">
              <form @submit.prevent="PostStore">
                <div class="form-group">
                  <label>TITLE</label>
                  <input type="text" class="form-control" v-model="post.title" placeholder="Input Title" />
                  <div v-if="validation.title">
                    <div class="alert alert-danger mt-1" role="alert">
                      {{ validation.title[0] }}
                    </div>
                  </div>
                </div>

                <div class="form-group mt-2">
                  <label>CONTENT</label>
                  <textarea class="form-control" v-model="post.content" rows="5" placeholder="Input Content"></textarea>
                  <div v-if="validation.content">
                    <div class="alert alert-danger mt-1" role="alert">
                      {{ validation.content[0] }}
                    </div>
                  </div>
                </div>
                <div class="action-btn mt-2 d-flex justify-content-between">
                  <div>
                    <button class="btn btn-md btn-primary" @click.prevent="BackPage()">BACK</button>
                  </div>
                  <div>
                    <button type="submit" class="btn btn-md btn-success">SUBMIT</button>
                    |
                    <button type="reset" class="btn btn-md btn-danger">RESET</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      post: {},
      validation: [],
    };
  },
  methods: {
    BackPage() {
      this.$router.push({
        name: 'posts',
      });
    },
    PostStore() {
      axios
        .post('http://localhost:8000/posts', this.post)
        .then((response) => {
          this.$swal
            .fire({
              title: response.data.status,
              text: response.data.message,
              icon: 'success',
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonText: 'Ok!',
            })
            .then((result) => {
              if (result.isConfirmed) {
                this.$router.push({
                  name: 'posts',
                });
              }
            });
        })
        .catch((error) => {
          console.error(error.response);
          this.validation = error.response.data.data;
        });
    },
  },
};
</script>
