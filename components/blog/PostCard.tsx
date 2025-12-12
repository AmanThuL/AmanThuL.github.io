import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../types';
import { Calendar, ChevronRight, Clock } from 'lucide-react';
import { CardShell } from '../ui/CardShell';

interface PostCardProps {
  post: BlogPost;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link to={`/blog/${post.slug}`} className="group block h-full cursor-hover">
      <CardShell className="h-full hover:border-cool-2/50">
        <div className="absolute inset-0 bg-cool-2/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

        <div className="h-48 overflow-hidden relative border-b border-white/5 bg-black">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute top-2 right-2 bg-black/80 backdrop-blur px-2 py-1 border border-white/10 text-[10px] font-mono text-cool-2 uppercase">
            LOG_ID: {post.id.padStart(3, '0')}
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow relative z-10">
          <div className="flex gap-4 text-[10px] font-mono text-gray-500 mb-4 uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Calendar size={10} /> {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={10} /> {post.readTime}
            </span>
          </div>

          <h2 className="text-xl font-bold font-sans text-white mb-3 group-hover:text-cool-2 transition-colors line-clamp-2">
            {post.title}
          </h2>

          <p className="text-gray-400 text-sm font-light leading-relaxed mb-6 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] uppercase border border-white/10 px-1.5 py-0.5 text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="text-cool-2 transform group-hover:translate-x-1 transition-transform">
              <ChevronRight size={16} />
            </div>
          </div>
        </div>
      </CardShell>
    </Link>
  );
};
