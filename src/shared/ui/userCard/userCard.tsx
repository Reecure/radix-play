import type { FC } from 'react'
import * as Avatar from '@radix-ui/react-avatar'
import { Text } from '../text/Text'
import { Skeleton } from '../skeleton/Skeleton'
import clsx from 'clsx'
import './userCard.scss'

interface Props {
    photo?: string
    name?: string
    position?: string
    isLoading?: boolean
    className?: string
}

const UserCard: FC<Props> = ({
                                 name,
                                 position,
                                 photo,
                                 isLoading = false,
                                 className
                             }) => {
    return (
        <div className={clsx('user-card', className)}>
            {isLoading ? (
                <Skeleton variant="circular" width={40} height={40} />
            ) : (
                <Avatar.Root className="AvatarRoot">
                    <Avatar.Image
                        className="AvatarImage"
                        src={photo}
                        alt={name}
                    />
                    <Avatar.Fallback className="AvatarFallback" delayMs={600}>
                        {name
                            ?.split(' ')
                            .map(n => n[0])
                            .join('')}
                    </Avatar.Fallback>
                </Avatar.Root>
            )}

            <div className="user-card__info">
                {isLoading ? (
                    <>
                        <Skeleton width={120} height={14} />
                        <Skeleton width={90} height={12} />
                    </>
                ) : (
                    <>
                        <Text size="md">{name}</Text>
                        <Text size="sm">{position}</Text>
                    </>
                )}
            </div>
        </div>
    )
}

export default UserCard
