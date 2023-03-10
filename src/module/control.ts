import { DispatchContext, RETURN_VALUE } from '../Instance';
import { Module } from '../Module';
import { toNumber } from '../util';

export default {
  repeat_until: (context: DispatchContext) => {
    const condition = context.values['CONDITION'];
    if (!condition) throw new Error('CONDITION not found');
    const substack = context.statements['SUBSTACK'];
    while (!context.instance.resolve(condition)) {
      if (substack) context.instance.execute(substack.child);
    }
  },
  repeat: (context: DispatchContext) => {
    const times = toNumber(context.resolveValue('TIMES'));
    const substack = context.statements['SUBSTACK'];
    if (!substack) return;
    for (let i = 0; i < times; i++) {
      context.instance.execute(substack.child);
    }
  },
  if: (context: DispatchContext) => {
    const condition = context.values['CONDITION'];
    if (!condition) throw new Error('CONDITION not found');
    const substack = context.statements['SUBSTACK'];
    if (context.instance.resolve(condition)) {
      if (substack) context.instance.execute(substack.child);
    }
  },
  if_else: (context: DispatchContext) => {
    const condition = context.values['CONDITION'];
    if (!condition) throw new Error('CONDITION not found');
    const substack = context.statements['SUBSTACK'];
    const substack2 = context.statements['SUBSTACK2'];
    if (context.instance.resolve(condition)) {
      if (substack) context.instance.execute(substack.child);
    } else {
      if (substack2) context.instance.execute(substack2.child);
    }
  },
  forever: (context: DispatchContext) => {
    const substack = context.statements['SUBSTACK'];
    if (!substack) for (;;);
    while (true) {
      context.instance.execute(substack.child);
    }
  },
  wait_until: (context: DispatchContext) => {
    const condition = context.values['CONDITION'];
    if (!condition) throw new Error('CONDITION not found');
    while (!context.instance.resolve(condition)) {
      // NOP
    }
  },
  run: (context: DispatchContext) => {
    // NOP
  },
  wait: (context: DispatchContext) => {
    const time = toNumber(context.resolveValue('DURATION')) * 1000;
    if (time <= 0) return;
    
    const start = Date.now();
    while (Date.now() - start < time) {
      // NOP
    }
  }
} as Module;