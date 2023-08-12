import React from 'react';
import { User } from '../../types/User';
import './UserCard.css';

type Props = {
  user: User;
}

export const UserCard: React.FC<Props> = ({user}) => {
  const { avatar_url, login, name, bio, html_url } = user;

  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={avatar_url} alt="Placeholder image" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="card-title title is-4">{name}</p>
            <a className="" href={html_url} rel="noreferrer" target="_blank" >@{login}</a>
          </div>
        </div>

        <div className="content">
          {bio || 'No biography'}
        </div>
      </div>
    </div>
  );
};