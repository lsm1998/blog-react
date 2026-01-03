import React from 'react';
import { useFetch } from '../hooks/useFetch';
import type { UserProfile } from '../types';
import { DEFAULT_AVATAR } from '../constants'; 

export const ProfileCard: React.FC = () => {
  const { data: user, loading, error } = useFetch<UserProfile>('/api/user/lsm1998');

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 mb-4"></div>
        <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  if (error || !user) {
     return null;
  }

  return (
    <div className="
      bg-white dark:bg-gray-800 
      p-6 rounded-lg shadow-sm 
      border border-gray-100 dark:border-gray-700 
      sticky top-24 
      flex flex-col items-center text-center
    ">
      <img
        src={user.headshot || DEFAULT_AVATAR}
        alt={user.username}
        className="
          w-32 h-32 rounded-full mb-4 shadow-lg object-cover 
          ring-4 ring-gray-50 dark:ring-gray-700
          transition-transform duration-300 hover:scale-105
        "
      />
      
      <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-2">
        {user.username}
      </h3>
      
      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
        {user.bio}
      </p>

      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {(user.techStack||[]).map(tech => (
          <span key={tech} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
            {tech}
          </span>
        ))}
      </div>
      
      {user.github && (
        <a 
          href={user.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 text-blue-500 hover:text-blue-600 font-medium text-sm flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          Follow on GitHub
        </a>
      )}
    </div>
  );
};