
<template>
  <n-config-provider :theme="theme">

    <div class="container">
      <div class="header">
        <n-space justify="center">
          <n-input class="search" round placeholder="输入词根搜索" size="large">
          </n-input>
        </n-space>
      </div>

      <div class="content">
        <div class="c-row">
          <div class="c-col-left">
            <n-scrollbar>
              <n-list hoverable clickable>
                <n-list-item v-for="item in data" :key="item.key" @click="showEtymon(item)" :class="{'active': item.key===(currEtymon && currEtymon.key)}">
                  <div class="e-item">
                    <div class="label ellip">{{item.label}}</div>
                    <div class="meaning ellip">{{item.base || (item.means&&item.means[0].meaning)||''}}</div>
                  </div>
                </n-list-item>
              </n-list>
            </n-scrollbar>
          </div>
          <div class="c-col-right">
            <n-scrollbar>
              <etymon-card :value="currEtymon"></etymon-card>
            </n-scrollbar>
          </div>
        </div>
      </div>
      <div class="footer">欢迎使用，学海无涯，为你做帆</div>
    </div>

  </n-config-provider>
</template>


<script lang="ts">
import jsonData from '@/assets/etymons.json';
import { NThemeEditor, darkTheme, NConfigProvider, NDataTable, NRow, NCol, NInput, NSpace, rowProps, NList, NListItem, NScrollbar } from 'naive-ui';
import { defineComponent, ref } from 'vue';
import type { Etymon } from '@/components/types'
import EtymonCard from '@/components/EtymonCard.vue'

const MAX_COUNT: number = 20;

export default defineComponent({
  components: { EtymonCard, NThemeEditor, NConfigProvider, NInput, NSpace, NDataTable, NRow, NCol, NList, NListItem, NScrollbar },
  setup() {

    function buildEtymonLite(e: Etymon) {
      return { type: e.type, label: e.label, base: e.base, etymons: e.etymons }
    }

    function filterTopN(array: any[], filter: Function, topN: number) {
      if (!array || array.length == 0 || topN <= 0) {
        return []
      }
      const result = []
      for (let i: number = 0; i < array.length; i++) {
        if (filter(array[i])) {
          result.push(array[i])
        }
        if (result.length == topN) {
          break;
        }
      }
      return result
    }

    let currEtymon: Etymon = ref(undefined)

    function showEtymon(etymon: Etymon) {
      currEtymon.value = etymon
    }

    const etymons: Etymon[] = jsonData
    const list = filterTopN(etymons, function (x: any) { return x.type == 2 }, MAX_COUNT)
    const data = ref(list)

    return {
      theme: null,
      showEtymon,
      data,
      currEtymon
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
  padding: 3px 10px;
  text-align: center;
  /* background-color: #ffffee; */
}

.search {
  min-width: 400px;
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

.n-list-item.active{
  color: #ff8000;
}
.e-item{
  line-height: 14px;
}

.e-item>.label {
  min-width: 5em;
  max-width: 15em; 
}

.e-item>.meaning {
  margin-left: 10px;
  max-width: calc(100% - 15em - 10px);
}

.ellip{
  overflow: hidden; 
  white-space: nowrap; 
  text-overflow: ellipsis;
}
</style>
