<template>
  <section class="todo">
    <div class="todo__container">
      <h2>Todo</h2>
      <nav class="nav">
        <router-link class="link" to="/todo/add">Добавить задачу</router-link>
        <router-link class="link" to="/todo/statistics">Статистика</router-link>
      </nav>
      <hr/>

      <div class="welcom" v-if="isTodo">
        <p> Здравствуйте!</p>
        <p>Вы попали на вкладку приложения "Todo".</p>
        <p>Пожалуйста, выбирите одну из возможных опций:</p>
        <ul>
          <li>"Добавить новую задачу"</li>
          <li>"Статистика"</li>
        </ul>
        <br>
        <p>Вкладка "Добавить задачу" - позволяет добавить новую задачу в список задач</p>
        <br>
        <p>Вкладка "Статистика" - отображает колличество выполненных / невыполненных задач</p>
      </div>

      <router-view />
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  async mounted() {
    this.fetchTodos(5);
  },
  methods: {
    ...mapActions(['fetchTodos']),
  },
  computed: {
    isTodo() {
      return this.$route.name === 'todo'
    }
  }
}
</script>

<style scoped>
.todo {
  text-align: center;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  color: #f0e3ca;
  background: #1b1a17;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #1b1a17;

  margin: 0 auto;
  padding: 22px;
  min-height: 100%;
}

.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  padding: 23px;
}

.link {
  text-decoration: none;
  color: inherit;
  transition: opacity .3s;
}

.link:hover {
  opacity: .8;
}

.link:after {
  position: absolute;
  content: '';
  left: 0;
  bottom: -4px;
  width: 0;
  border-bottom: 2px solid #f0e3ca;
  transition: width .3s;
}

.link:hover:after {
  width: 80%;
}

.welcom {
  padding: 23px;
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 5px;
}
</style>