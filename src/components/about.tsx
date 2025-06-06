import Image from "next/image";
import { getPayload } from "payload";
import config from "@payload-config";
import { PostType } from "@/type/postType";

export default async function About() {
  const payload = await getPayload({ config });

  // Get the media
  const resultMedia = await payload.find({
    collection: 'media',
  });

  // Get the posts
  const resultPosts = await payload.find({
    collection: 'posts',
  });

  const heroImage = resultMedia.docs.find((media) => media.filename === 'About-Hero2.jpg') || { url: '/About-Hero2.jpg' };

  const posts: PostType[] = resultPosts.docs as PostType[];

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={heroImage.url || ''}
                  alt="Exquisite Japanese cuisine"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8 text-white">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-light tracking-wide">
                  WILLKOMMEN IM<br />SANJI&apos;S
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
              Tauchen Sie ein in eine Welt des exquisiten Genusses, in der Qualität 
              auf höchstem Niveau zelebriert wird. Bei uns steht das Beste vom Besten 
              im Mittelpunkt: von zartem Wagyu-Rindfleisch bis hin zu erstklassigem Black Angus. 
              Unser Engagement für herausragende Qualität spiegelt sich nicht nur in unseren 
              Gerichten wider, sondern auch in unserer Auswahl an erstklassigen Zutaten und handgefertigten Cocktails.
              </p>
              <p className="text-gray-400 leading-relaxed">
              Bei uns dreht sich alles um die feinsten Geschmackserlebnisse, die Sie sich 
              vorstellen können. Mit jedem Bissen und jedem Schluck entführen wir Sie auf eine 
              kulinarische Reise, die Ihre Sinne verzaubern wird. Unsere Leidenschaft für außergewöhnliches 
              Essen und exzellenten Service ist in jedem Detail spürbar – von der Auswahl der 
              Zutaten bis hin zur Präsentation auf Ihrem Teller.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6">
              Das Team
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-8"></div>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Lernen Sie die talentierten Köche kennen, die hinter jedem
              außergewöhnlichen Gericht stehen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post.id} className="group">
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6 shadow-xl">
                  <Image 
                    src={post.Bild.url} 
                    alt={post.Mitarbeiter}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-medium text-white mb-1">
                      {post.Mitarbeiter}
                    </h3>
                    <p className="text-yellow-400 text-sm font-light">
                      {post.beschreibung}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
