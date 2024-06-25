import { getLimitedStories, getStories } from "@/actions/story";
import { getUniqueTopics, SelectedTopics } from "@/actions/topics";
import GetStories from "@/components/GetStories";
import Sidebar from "@/components/Sidebar";
import Topics from "@/components/Topics";

export default async function Home({
  searchParams,
}: {
  searchParams: { tag: string };
}) {
  const allTopics = await getUniqueTopics();
  const getSelectedTopics = await SelectedTopics();
  const stories = await getStories(searchParams?.tag);
  const limitedStories = await getLimitedStories(searchParams?.tag);
  console.log(limitedStories, "stories");
  return (
    <div className="w-full max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.5fr] gap-20 justify-between">
        <div className="py-8">
          <Topics allTopics={allTopics} userTags={getSelectedTopics} />
          <GetStories stories={stories} />
        </div>
        <Sidebar stories={limitedStories} />
      </div>
    </div>
  );
}
