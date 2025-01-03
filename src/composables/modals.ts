import type { Ref } from "vue";
import type { ComponentConstructor } from "../types";
import { markRaw, ref } from "vue";

interface Modal {
  id: string;
  component: ComponentConstructor;
  bindings: Record<string, any>;
}

type Bindings<T extends ComponentConstructor> = InstanceType<T>["$props"];
type ReturnValue<T extends ComponentConstructor> = Parameters<
  Bindings<T>["onClose"]
>[0];

const scopes: Record<string, Ref<Modal[]>> = {};

export function useModals(scope = "") {
  const modals = (scopes[scope] ??= ref<Modal[]>([]));

  async function open<T extends ComponentConstructor>(
    component: T,
    bindings: Bindings<T>,
  ) {
    return new Promise<ReturnValue<T>>((resolve) => {
      const id = crypto.randomUUID();

      modals.value.push({
        id,
        component: markRaw(component),
        bindings: {
          onClose: (data: any) => {
            resolve(data);
            close(id);
          },
          ...bindings,
        },
      });
    });
  }

  function close(id: string) {
    const index = modals.value.findIndex((modal) => modal.id === id);
    if (index !== -1) modals.value.splice(index, 1);
  }

  return {
    modals,
    open,
    close,
  };
}
