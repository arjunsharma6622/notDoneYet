import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = "edge";

export async function GET(req: NextRequest) {

    const reqUrl = req.url

    const { searchParams } = new URL(reqUrl)

    const {
        name,
        bio,
        userName,
        role,
        image,
    } = Object.fromEntries(searchParams.entries())


    return new ImageResponse(
        (
            <div
                style={{
                    color: 'black',
                    background: 'white',
                    padding: '50px 200px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '50px',
                    backgroundColor: 'white',
                    backgroundImage: 'radial-gradient(circle at 15px 15px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
                    height: '100%',
                    width: '100%',
                    flexWrap: 'nowrap',
                    backgroundSize: '100px 100px',
                }}
            >

                <div tw="flex items-center justify-center bg-gray-100 p-4 py-2 rounded-2xl">
                    <img src="https://www.notdoneyet.in/logo_long.svg" alt="NDY Logo" style={{ height: '50px' }} />
                    <span tw="text-3xl font-bold ml-4">/  {role}</span>
                </div>

                <div tw='flex flex-col items-center justify-center'>
                    {role === 'venue' ?
                        <img tw='border-white' src={image} alt="User Icon" style={{ height: '180px', borderRadius: '20px' }} />
                        :
                        <img tw='border-white' src={image} alt="User Icon" style={{ height: '180px', borderRadius: '100%' }} />
                    }

                    <div tw='flex flex-col items-center max-w-2xl'>
                        <p tw='text-5xl font-black'>{name}</p>
                        {bio &&
                            <p tw='text-gray-600 text-base -mt-1 font-light'>{bio}</p>
                        }
                        <p tw="text-gray-500 text-sm">notdoneyet.in/{role}/{userName}</p>
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        },
    );
}