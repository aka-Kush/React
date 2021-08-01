import React from 'react'
import PeopleCard from './PeopleCard'
import IMG_NOT_FOUND from '../../images/not-found.png'
import { FlexGrid } from '../Styled'

const PeopleGrid = ({data}) => {
    return (
        <FlexGrid>
            {data.map(({ person }) =>
                <PeopleCard
                    key={person.id}
                    name={person.name}
                    country={person.country ? person.country.name : null}
                    birthday={person.birthday}
                    deathday={person.deathday}
                    gender={person.gender}
                    image={person.image ? person.image.medium : IMG_NOT_FOUND}
                />
            )};
        </FlexGrid>
    )
}

export default PeopleGrid
