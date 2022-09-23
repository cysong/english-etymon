<template>
    <div v-if="value" class="e-container">
        <div class="e-label">{{value.label}}</div>
        <div class="e-base-container">
            <span class="e-synonym" v-if="value.synonym">{{value.synonym}},</span>
            <span class="e-base" v-if="value.base">{{value.base}}</span>
        </div>
        <n-divider style="margin-top:6px;margin-bottom: 18px;"/>
        <div class="e-mean-container">
            <div class="e-mean-item" v-for="(mean,mIndex) in value.means" :key="mIndex">
                <div class="e-mean" v-if="mean.meaning">{{mean.meaning}}</div>
                <n-space v-for="sample in mean.samples" :key="sample.word"
                    :class="{'e-word-container':true, 'indent':value.means&&value.means[0].meaning}" :wrap="false">
                    <div class="e-word">{{sample.word}}</div>
                    <div class="e-cn">
                        <span>{{sample.cn}}</span>
                        <span class="e-desc" v-if="sample.desc">({{sample.desc}})</span>
                    </div>
                </n-space>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import type { Etymon } from '@/components/types'
import { defineComponent, type PropType } from 'vue';
import { NDivider } from 'naive-ui';

export default defineComponent({
    name: 'EtymonCard',
    components: { NDivider },
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
    color: #ff8000
}

.e-base-container>span:nth-child(2) {
    margin-left: 5px;
}

.e-mean-container {
    margin-top: 10px;
}

.e-mean-item {
    margin-top: 3px;
}

.e-mean {
    font-weight: 500;
    font-size: 1.2em;
}

.e-word-container.indent {
    margin-left: 10px;
}

.e-word {
    min-width: 5em;
}

.e-cn {}

.e-desc {
    color: #6a7a8a;
    margin-left: 5px;
}
</style>