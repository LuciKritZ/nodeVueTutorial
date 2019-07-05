<template>
  <div id="app">
    <CreateTodo />
    <!-- <ListTodo /> -->
  </div>
</template>

<script>
import CreateTodo from '../src/components/CreateTodo';
import ListTodo from './components/ListTodo';

export default {
  name: 'app',
  components: {
    CreateTodo,
    ListTodo
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
