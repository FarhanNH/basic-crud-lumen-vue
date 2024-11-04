<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="posts">
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">POSTS</div>
            <div class="card-body">
              <RouterLink :class="['btn btn-md btn-success mb-2']" to="/create">ADD POSTS</RouterLink>
              <hr />
              <div class="text-center" v-if="isBusy">
                <div class="spinner-grow text-secondary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
              <div class="table-responsive mt-2" v-else>
                <table class="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th>TITLE</th>
                      <th>CONTENT</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="post in posts" :key="post.id">
                      <td>{{ post.title }}</td>
                      <td>{{ post.content }}</td>
                      <td class="text-center">
                        <RouterLink :to="{ name: 'editPosts', params: { id: post.id } }" class="btn btn-sm btn-primary mr-2">EDIT</RouterLink>
                        |
                        <button @click.prevent="postDelete(post.id)" class="btn btn-sm btn-danger">DELETE</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
      posts: [],
      isBusy: false,
    };
  },
  created() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      this.isBusy = true;
      axios
        .get('http://localhost:8000/posts')
        .then((response) => {
          this.posts = response.data.data;
        })
        .catch((error) => {
          console.error(error.response);
        })
        .finally(() => {
          this.isBusy = false;
        });
    },
    postDelete(id) {
      axios
        .delete(`http://localhost:8000/posts/${id}`)
        .then((response) => {
          this.$swal.fire({
            title: response.data.status,
            text: response.data.message,
            icon: 'success',
            confirmButtonText: 'Ok!',
          });
          let i = this.posts.map((data) => data.id).indexOf(id);
          this.posts.splice(i, 1);
        })
        .catch((error) => {
          console.error(error.response);
        });
    },
  },
};
</script>

<style></style>
