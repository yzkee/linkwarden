import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { styles } from "./styles";
import { ArchivalTagOption, Option } from "./types";
import { useTags } from "@/hooks/store/tags";
import { useTranslation } from "next-i18next";

type Props = {
  onChange: (e: any) => void;
  options?: Option[] | ArchivalTagOption[];
  isArchivalTagSelection?: boolean;
  defaultValue?: {
    value?: number;
    label: string;
  }[];
  autoFocus?: boolean;
  onBlur?: any;
};

export default function TagSelection({
  onChange,
  options,
  isArchivalTagSelection,
  defaultValue,
  autoFocus,
  onBlur,
}: Props) {
  const { t } = useTranslation();

  if (isArchivalTagSelection && options) {
    return (
      <CreatableSelect
        isClearable={false}
        className="react-select-container"
        classNamePrefix="react-select"
        onChange={onChange}
        options={options}
        styles={styles}
        value={[]}
        defaultValue={defaultValue}
        placeholder={t("tag_selection_placeholder")}
        isMulti
        autoFocus={autoFocus}
        onBlur={onBlur}
      />
    );
  } else {
    const { data: tags = [] } = useTags();
    const [options, setOptions] = useState<Option[]>([]);

    useEffect(() => {
      const formatedCollections = tags.map((e: any) => {
        return { value: e.id, label: e.name };
      });

      setOptions(formatedCollections);
    }, [tags]);

    return (
      <CreatableSelect
        isClearable={false}
        className="react-select-container"
        classNamePrefix="react-select"
        onChange={onChange}
        options={options}
        styles={styles}
        defaultValue={defaultValue}
        placeholder={t("tag_selection_placeholder")}
        isMulti
        autoFocus={autoFocus}
        onBlur={onBlur}
      />
    );
  }
}
