import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { UserOutlined, FileOutlined } from '@ant-design/icons';


export default function Dashboard(props) {


	return (
		<div>
			<section>
				<div className="bg-lightBlue-600">
					<div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 text-coolGray-900">
						<h1 className="text-5xl font-bold leading-none sm:text-6xl xl:max-w-3xl text-coolGray-50">ADMIN TEMPLATE</h1>
						<p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl text-coolGray-50">Welcome to Admin Template</p>
						<div className="flex flex-wrap justify-center">
							<NavLink to="/admin/users">
								<button type="button" className="px-8 py-3 m-2 text-lg font-semibold border border-blue-500 rounded bg-blue-500 text-black hover:bg-white hover:text-blue-500 hover:border-black transition-all delay-100 ease-linear">
									<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
										<UserOutlined style={{ fontSize: 25, marginRight: 10 }} />
										USERS
									</div>
								</button>
							</NavLink>
							<NavLink to="/admin/films">
								<button type="button" className="px-8 py-3 m-2 text-lg border font-semibold rounded border-blue-500 bg-blue-500 text-black hover:bg-white hover:text-blue-500 hover:border-black transition-all delay-100 ease-linear">
									<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
										<FileOutlined style={{ fontSize: 25, marginRight: 10 }} />
										FILMS
									</div>
								</button>
							</NavLink>
						</div>
					</div>
				</div>

				<img src="https://source.unsplash.com/random/480x320" alt="" className="w-5/6 mx-auto mb-12 -mt-20 rounded-lg shadow-md lg:-mt-40 bg-coolGray-500" />
			</section>
		</div>
	)
}
