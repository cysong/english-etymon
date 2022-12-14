
<template>
  <n-config-provider :theme="theme">

    <div class="container">
      <div class="header">
        <div class="search-wrapper">
          <n-input v-model="keyword" class="search" round clearable size="large" :autofocus=true
            :allow-input="s=>/^[A-Za-z-\[\]]*$/.test(s)" placeholder="输入词根搜索，前缀以-结束，后缀以-开头" @input="handleInput">
          </n-input>
        </div>
      </div>

      <div class="content">
        <div class="c-row">
          <div class="c-col-left">
            <n-scrollbar>
              <n-list hoverable clickable>
                <n-list-item v-for="item in data" :key="item.key" @click="showEtymon(item)"
                  :class="{'active': item.key===(currEtymon && currEtymon.key)}">
                  <div class="e-item">
                    <div class="label ellip">{{item.label}}</div>
                    <div class="meaning ellip">{{item.base || (item.means&&item.means[0].meaning)||''}}</div>
                  </div>
                </n-list-item>
                <template #footer>
                  <div class="paging">
                    <n-button text color="#aaaaaa" v-show="showPrevPage" @click="prevPage">
                      上一页
                    </n-button>
                    <n-button text color="#aaaaaa" v-show="showNextPage" @click="nextPage">
                      下一页
                    </n-button>
                  </div>
                </template>
              </n-list>
              <n-empty v-if="data.length==0" description="没有更多数据了" style="margin-top:150px;"></n-empty>
            </n-scrollbar>
          </div>
          <div class="c-col-right">
            <n-scrollbar>
              <etymon-card :value="currEtymon"></etymon-card>
            </n-scrollbar>
          </div>
        </div>
      </div>
      <div class="footer">欢迎使用英语词根查询，英语学习路上与你同行</div>
    </div>

  </n-config-provider>
</template>


<script lang="ts">
import jsonData from '@/assets/etymons.json';
import EtymonCard from '@/components/EtymonCard.vue';
import type { Etymon } from '@/components/types';
import utils from '@/utils/utils';
import { computed, defineComponent, ref, type Ref } from 'vue';

const MAX_COUNT: number = 10

export default defineComponent({
  components: { EtymonCard },
  setup() {

    let currEtymon: Ref<Etymon | undefined> = ref(undefined)

    function showEtymon(etymon: Etymon) {
      currEtymon.value = etymon
    }

    const etymons: Array<Etymon> = jsonData
    const data: Ref<Array<Etymon>> = ref([])

    const forwardIndex: Ref<number> = ref(0)
    const backwordIndex: Ref<number> = ref(-1)

    function resetIndex() {
      forwardIndex.value = 0
      backwordIndex.value = -1
    }

    function search(query: string, type: number | null, backword: boolean = false, startIndex: number = 0) {
      const filter: Function = function (x: Etymon) {
        return (!type || (type && type === x.type))
          && (query === '' || (x.etymons.some(e => e.startsWith(query))))
      }
      let index: number
      if (backword) {
        [index, data.value] = utils.filterBackwordTopN(etymons, filter, MAX_COUNT, startIndex)
      } else {
        [index, data.value] = utils.filterTopN(etymons, filter, MAX_COUNT, startIndex)
      }

      if (data.value.length > 0 && !currEtymon.value) {
        currEtymon.value = data.value[0]
      }
      if (backword) {
        forwardIndex.value = backwordIndex.value + 1
        backwordIndex.value = index - 1
      } else {
        backwordIndex.value = forwardIndex.value - 1
        forwardIndex.value = index + 1
      }
    }
    search('', null)

    let query: string = ''
    let type: number | null

    function nextPage() {
      search(query, type, false, forwardIndex.value)
    }

    function prevPage() {
      search(query, type, true, backwordIndex.value)
    }

    let showPrevPage = computed(() => backwordIndex.value > -1)
    let showNextPage = computed(() => forwardIndex.value < etymons.length)

    const debounce = utils.debounce(search, 300)
    function handleInput(input: String) {
      query = input.trim().toLowerCase();
      if (query.startsWith('-')) {
        type = 3
        query = query.replace(/^-+/, '')
      } else if (query.endsWith('-')) {
        type = 2
        query = query.replace(/-+$/, '')
      } else {
        type = null
      }
      resetIndex()
      debounce(query, type, false, 0)
    }

    return {
      theme: null,
      showEtymon,
      data,
      currEtymon,
      keyword: ref(''),
      handleInput,
      showPrevPage,
      showNextPage,
      nextPage,
      prevPage,
    }
  }
})
</script>

<style>
.contain .n-col>div {
  height: 100%;
}
</style>

<style scoped>
.container {
  height: 100vh;
}

.header {
  height: 100px;
  padding: 2rem;
  /* background-color: #eeffff; */
}

.content {
  height: calc(100% - 130px);
  height: -moz-calc(100% - 130px);
  height: -webkit-calc(100% - 130px);
  padding: 10px 0px;
  /* background-color: #ffeeff; */
}

.footer {
  height: 30px;
  padding: 0px 10px;
  text-align: center;
  color: #8a9aaa;
  /* background-color: #ffffee; */
}

.search-wrapper {
  min-width: 400px;
  width: 60%;
  margin: auto;
}

.e-item>div {
  display: inline-block
}

.content .c-row {
  height: 100%;
  display: flex;
}

.content .c-col-left,
.content .c-col-right {
  /* height: 100%; */
  flex: 1;
  justify-content: space-between;
  width: 50%;
}

.content .c-col-right {
  margin-left: 20px;
}

.n-list-item.active {
  color: #ff8000;
}

.e-item {
  height: 1.6em;
}

.e-item>.label {
  min-width: 5em;
  max-width: 15em;
}

.e-item>.meaning {
  margin-left: 10px;
  max-width: calc(100% - 15em - 10px);
}

.ellip {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.paging {
  display: flex;
  justify-content: end;
}

.paging>*:not(:first-child) {
  margin-left: 5px;
}
</style>
