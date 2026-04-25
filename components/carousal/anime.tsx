import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { anilist } from '@/lib/anilist';
import CarousalCard from '@/components/carousal/card';

export default async function CarousalComponent() {
  let items: any[] = [];
  try {
    items = await anilist.trending();
  } catch {
    return null;
  }

  if (!items.length) return null;

  return (
    <Carousel className="mb-10">
      <CarouselContent className="mx-auto flex w-full">
        {items.slice(0, 8).map((item: any) => {
          const show = {
            id: item.id,
            title: item.title?.english || item.title?.romaji,
            name: item.title?.romaji,
            overview: item.description?.replace(/<[^>]*>/g, ''),
            backdrop_path: null,
            poster_path: null,
            vote_average: item.averageScore ? item.averageScore / 10 : 0,
            release_date: item.startDate?.year ? `${item.startDate.year}-01-01` : null,
            first_air_date: null,
            _banner: item.bannerImage,
            _cover: item.coverImage?.extraLarge || item.coverImage?.large,
          };
          return (
            <CarouselItem key={item.id} className="basis-full">
              <CarousalCard show={show} type="anime" banner={item.bannerImage} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
