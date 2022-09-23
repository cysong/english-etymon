
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
              </n-list>
              <n-empty v-if="data.length==0" description="没有找到你输入的词根" style="margin-top:150px;"></n-empty>
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
import { NCol, NConfigProvider, NDataTable, NInput, NList, NListItem, NRow, NScrollbar, NSpace, NThemeEditor, NEmpty } from 'naive-ui';
import { defineComponent, ref, type Ref } from 'vue';

const MAX_COUNT: number = 10

export default defineComponent({
  components: { EtymonCard, NThemeEditor, NConfigProvider, NInput, NSpace, NDataTable, NRow, NCol, NList, NListItem, NScrollbar, NEmpty },
  setup() {

    function buildEtymonLite(e: Etymon) {
      return { type: e.type, label: e.label, base: e.base, etymons: e.etymons }
    }

    let currEtymon: Ref<Etymon | undefined> = ref(undefined)

    function showEtymon(etymon: Etymon) {
      currEtymon.value = etymon
    }

    const etymons: Array<Etymon> = jsonData
    const data: Ref<Array<Etymon>> = ref([])

    function search(query: string, type: number | null) {
      data.value = utils.filterTopN(etymons, function (x: Etymon) {
        return (!type || (type && type === x.type))
          && (query === '' || (x.etymons.some(e => e.startsWith(query))))
      }, MAX_COUNT)
      if (data.value.length > 0 && !currEtymon.value) {
        currEtymon.value = data.value[0]
      }
    }
    search('', undefined)

    const debounce = utils.debounce(search, 300)
    const reg = /^[ a-z-]+$/
    function handleInput(input: String) {
      let query = input.trim().toLowerCase();

      let type: number | undefined
      if (query.startsWith('-')) {
        type = 3
        query = query.replace(/^-+/, '')
      } else if (query.endsWith('-')) {
        type = 2
        query = query.replace(/-+$/, '')
      }
      debounce(query, type)
    }

    return {
      theme: null,
      showEtymon,
      data,
      currEtymon,
      keyword: ref(''),
      handleInput,
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
</style>
