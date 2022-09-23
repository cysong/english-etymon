<template>
    <div v-if="value" class="container">
        <div class="e-label">{{value.label}}</div>
        <div class="e-base" v-if="value.base">{{value.base}}</div>
        <div class="e-mean-container">
            <div class="e-mean-item" v-for="(mean,mIndex) in value.means" :key="mIndex">
                <div class="e-mean" v-if="mean.meaning">{{mean.meaning}}</div>
                <template v-for="sample in mean.samples" :key="sample.word">
                    <n-space class="e-word-container">
                        <div class="e-word">{{sample.word}}</div>
                        <div class="e-cn" v-if="sample.cn">{{sample.cn}}</div>
                        <div class="e-desc" v-if="sample.desc">{{sample.desc}}</div>
                    </n-space>
                </template>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import type { Etymon } from '@/components/types'
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
    name: 'EtymonCard',
    props: {
        value: { type: Object as PropType<Etymon> }
    },
    setup(props) {

    }
})
</script>
<style scoped>
.e-label {
    font-size: 1.5em;
    font-weight: 800;
    color:#ff8000
}

.e-mean-container{
    margin-top:10px;
}
.e-mean-item{
    margin-top: 3px;
}
.e-mean {
    font-weight: 500;
    font-size: 1.2em;
}

.e-word-container{
    margin-left:5px;
}
.e-word {
    min-width: 5em;
}

.e-cn {
}

.e-desc {
    color: #6a7a8a;
}
</style>