
import { list as zhList } from "@/data/zh/list";

import Link from "next/link";
import { Key, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import useSWR from "swr";
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const getCategories = (courseList) => {
  const categoryObj = {};
  courseList.forEach((course) => {
    if (categoryObj[course.category]) {
      categoryObj[course.category].push(course);
    } else {
      categoryObj[course.category] = [course];
    }
  });
  return categoryObj;
};

const CourseList = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const router = useRouter();
  const { locale } = router;

  const { data, error } = useSWR(`/api/courses?locale=${locale}`, fetcher);
  const list = data?.list || [];
  const t = useTranslations("CourseList");

  const [categories, setCategories] = useState({});

  useEffect(() => {
    setCategories(getCategories(list));
  }, [list, locale]);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredCourses(categories[selectedCategory]);
    } else {
      setFilteredCourses(list);
    }
  }, [selectedCategory, categories, list, locale]);

  useEffect(() => {
    setSelectedCategory(null);
  }, [locale]);
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div className='mt-4'>Loading...</div>;
  }
  return (
    <>
      <div className="h-full w-full max-w-md px-4 py-8 sm:px-0 m-2">
        <div className="ml-2 mb-4">
          <p className="text-slate-800 text-xs mb-1 dark:text-white">
            {t("selectText")}
          </p>
          <Select
            onValueChange={(value) => {
              setSelectedCategory(value);
            }}
          >
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder={t("selectTextPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value={null}
                onSelect={() => setSelectedCategory(null)}
              >
                {t("selectTextPlaceholder")}
              </SelectItem>
              {Object.keys(categories).map((category) => (
                <SelectItem
                  key={category}
                  value={category}
                  onSelect={() => setSelectedCategory(category)}
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ul
        className='flex flex-col space-y-1 overflow-y-scroll h-full'
        >
          {filteredCourses.map(
            (post: {
              category: string;
              id: Key;
              title: string;
              duration: number;
              cost: number;
              location: string;
              accommodation: number | null;
              href: string | undefined;
              description: string | null;
            }) => (
                <>
              <li
                key={post.id}
                className="relative rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <h3 className="text-sm font-medium leading-5 dark:text-white">
                  {post.title}
                </h3>

                <ul className="mt-1 flex flex-wrap space-x-1 text-xs font-normal leading-4 text-gray-500 dark:text-gray-100 ">
                  <li>{post.category}</li>
                 
                  <li>
              
                  </li>
              
                </ul>
                <a
                  href={`/program/${post.title}?introduction=${post.category}&description=${post.description}`}
                  target="_blank"
                  rel="noopener noreferer"
                  className={classNames(
                    "absolute inset-0 rounded-md",
                    "ring-blue-400 focus:z-10 focus:outline-none focus:ring-2"
                  )}
                ></a>
                  
              </li>
                  <hr
                  className='mx-2 border-slate-200 dark:border-slate-700'
                  />
                </>
            )
          )}
        </ul>
      </div>
    </>
  );
};

export default CourseList;
